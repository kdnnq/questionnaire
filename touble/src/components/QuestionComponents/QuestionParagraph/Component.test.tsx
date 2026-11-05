import { render, screen } from '@testing-library/react';
import Component from './Component';

describe('ComponentInfo', () => {
  it('默认属性', () => {
    render(<Component />); //渲染组件
    const span = screen.getByText('一行段落');
    expect(span).toBeInTheDocument();
  });
  test('传入属性', () => {
    render(<Component text="hello" isCenter={true} />);
    const span = screen.getByText('hello');
    expect(span).toBeInTheDocument();

    const p = span.parentElement;
    expect(p).not.toBeNull();

    const style = p!.style;
    expect(style.textAlign).toBe('center');
  });
  test('多行输入', () => {
    render(<Component text={'a\nb\nc'} />);
    const span = screen.getByText('a');
    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent('a');
    expect(span).not.toHaveTextContent('ab');
  });
});
