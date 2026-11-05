import { render, screen } from '@testing-library/react';
import Component from './Component';

describe('ComponentInfo', () => {
  it('默认属性', () => {
    render(<Component />); //渲染组件
    const p = screen.getByText('一行标题');
    expect(p).toBeInTheDocument();
  });
  test('传入属性', () => {
    render(<Component text="hello" level={2} isCenter={true} />);
    const p = screen.getByText('hello');
    expect(p).toBeInTheDocument();
    expect(p.matches('h2')).toBeTruthy();
    const style = p.style;
    expect(style.textAlign).toBe('center');
  });
});
