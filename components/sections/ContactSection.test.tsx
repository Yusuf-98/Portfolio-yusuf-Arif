import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ContactSection from './ContactSection';

// --- Helpers ---
function mockFetch(result: Promise<unknown>) {
  const fetchMock = vi.fn().mockReturnValue(result);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

function apiResponse(success: boolean) {
  return Promise.resolve({
    ok: success,
    json: async () => ({ success }),
  });
}

async function fillForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('Name'), 'Jane Doe');
  await user.type(screen.getByLabelText('Email'), 'jane@example.com');
  await user.type(screen.getByLabelText('Message'), 'Hello there');
  return user;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

// --- Tests ---
describe('ContactSection form', () => {
  it('shows required errors and does not send an empty form', async () => {
    const fetchMock = mockFetch(apiResponse(true));
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Message is required')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects an invalid email address', async () => {
    const fetchMock = mockFetch(apiResponse(true));
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.type(screen.getByLabelText('Name'), 'Jane Doe');
    await user.type(screen.getByLabelText('Email'), 'not-an-email');
    await user.type(screen.getByLabelText('Message'), 'Hello there');
    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(
      screen.getByText('Please enter a valid email address')
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sends the message and shows the success popup', async () => {
    const fetchMock = mockFetch(apiResponse(true));
    render(<ContactSection />);

    const user = await fillForm();
    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(
      await screen.findByText('Message Sent Successfully!')
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.web3forms.com/submit');
    expect(JSON.parse(options.body)).toMatchObject({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Hello there',
    });
    expect(screen.getByLabelText('Name')).toHaveValue('');
  });

  it('shows the failed popup when the API rejects the message', async () => {
    mockFetch(apiResponse(false));
    render(<ContactSection />);

    const user = await fillForm();
    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(await screen.findByText('Message not sent!')).toBeInTheDocument();
  });

  it('disables the button while the message is sending', async () => {
    mockFetch(new Promise(() => {}));
    render(<ContactSection />);

    const user = await fillForm();
    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled();
  });
});
