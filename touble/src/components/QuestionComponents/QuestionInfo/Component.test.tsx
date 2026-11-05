import { render, screen } from '@testing-library/react';
import Component from './Component';

describe('ComponentInfo', () => {
  it('默认属性', () => {
    render(<Component />); //渲染组件
    const h = screen.getByText('问卷标题');
    expect(h).toBeInTheDocument(); //断言
  });
  test('传入属性', () => {
    render(<Component title="hello" desc="world" />);
    const h = screen.getByText('hello');
    expect(h).toBeInTheDocument();
    const p = screen.getByText('world');
    expect(p).toBeInTheDocument();
  });
  test('多行输入', () => {
    render(<Component desc={'a\nb\nc'} />);
    const span = screen.getByText('a');
    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent('a');
    expect(span).not.toHaveTextContent('ab');
  });
});
