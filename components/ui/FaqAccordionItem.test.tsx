import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FaqAccordionItem } from './FaqAccordionItem';

const props = { question: 'What do you build?', answer: 'React apps.' };

describe('FaqAccordionItem', () => {
  it('hides the answer when closed', () => {
    render(<FaqAccordionItem {...props} isOpen={false} onToggle={() => {}} />);

    const button = screen.getByRole('button', { name: props.question });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText(props.answer)).not.toBeInTheDocument();
  });

  it('shows the answer when open', () => {
    render(<FaqAccordionItem {...props} isOpen onToggle={() => {}} />);

    const button = screen.getByRole('button', { name: props.question });
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(props.answer)).toBeInTheDocument();
  });

  it('calls onToggle when the question is clicked', async () => {
    const onToggle = vi.fn();
    render(<FaqAccordionItem {...props} isOpen={false} onToggle={onToggle} />);

    await userEvent.click(screen.getByRole('button', { name: props.question }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
