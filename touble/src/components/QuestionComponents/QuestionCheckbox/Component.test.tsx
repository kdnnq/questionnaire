import { render, screen } from '@testing-library/react';
import Component from './Component';

describe('ComponentInfo', () => {
  it('默认属性', () => {
    render(<Component />);
    const p = screen.getByText('多选标题');
    expect(p).toBeInTheDocument();

    for (let i = 1; i <= 3; i++) {
      const checkbox = screen.getByDisplayValue(`item${i}`);
      expect(checkbox).toBeInTheDocument();
      const label = screen.getByText(`选项${i}`);
      expect(label).toBeInTheDocument();

      expect(checkbox.getAttribute('checked')).toBeNull();
    }
  });
  test('传入属性', () => {
    const list = [
      { value: 'v1', text: 't1', checked: false },
      { value: 'v2', text: 't2', checked: true },
      { value: 'v3', text: 't3', checked: true },
    ];
    render(<Component title="hello" list={list} />);
    const p = screen.getByText('hello');
    expect(p).toBeInTheDocument();

    list.forEach((opt) => {
      const checkbox = screen.getByDisplayValue(opt.value);
      expect(checkbox).toBeInTheDocument();
      const label = screen.getByText(opt.text);
      expect(label).toBeInTheDocument();

      if (opt.checked) {
        expect(checkbox.getAttribute('checked')).not.toBeNull();
      } else {
        expect(checkbox.getAttribute('checked')).toBeNull();
      }
    });
  });
});
