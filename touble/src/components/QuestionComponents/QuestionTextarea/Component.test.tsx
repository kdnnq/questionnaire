import { render, screen } from '@testing-library/react';
import Component from './Component';

describe('ComponentInfo', () => {
  it('默认属性', () => {
    render(<Component />); //渲染组件
    const p = screen.getByText('输入框标题');
    expect(p).toBeInTheDocument();

    const textarea = screen.getByPlaceholderText('请输入');
    expect(textarea).toBeInTheDocument();
  });
  test('传入属性', () => {
    render(<Component title="hello" placeholder="world" />);
    const p = screen.getByText('hello');
    expect(p).toBeInTheDocument();
    const textarea = screen.getByPlaceholderText('world');
    expect(textarea).toBeInTheDocument();
  });
});
