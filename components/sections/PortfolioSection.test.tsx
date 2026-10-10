import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { projects } from '@/lib/data/projects';
import PortfolioSection from './PortfolioSection';

const first = projects[0];
const second = projects[1];
const last = projects[projects.length - 1];

// --- Helpers ---
async function openFirstProject() {
  const user = userEvent.setup();
  render(<PortfolioSection />);

  const card = screen.getAllByRole('button', {
    name: `View ${first.title} details`,
  })[0];
  await user.click(card);

  const dialog = await screen.findByRole('dialog');
  return { user, card, dialog };
}

// --- Tests ---
describe('PortfolioSection project dialog', () => {
  it('opens the clicked project in a dialog', async () => {
    const { dialog } = await openFirstProject();

    expect(
      within(dialog).getByRole('heading', { name: first.title })
    ).toBeInTheDocument();
  });

  it('moves to the next and previous project', async () => {
    const { user, dialog } = await openFirstProject();

    await user.click(within(dialog).getByRole('button', { name: /next/i }));
    expect(
      await within(dialog).findByRole('heading', { name: second.title })
    ).toBeInTheDocument();

    await user.click(within(dialog).getByRole('button', { name: /previous/i }));
    await user.click(within(dialog).getByRole('button', { name: /previous/i }));
    expect(
      await within(dialog).findByRole('heading', { name: last.title })
    ).toBeInTheDocument();
  });

  it('closes on Escape and returns focus to the card', async () => {
    const { user, card } = await openFirstProject();

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
    expect(card).toHaveFocus();
  });
});
