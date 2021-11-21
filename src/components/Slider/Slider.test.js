import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react'
import Slider from './Slider';

// 測試滑鼠移動到相片上，相片會停止輪播
describe('hover to stop slider', () => {
  // 預期符合快照
  it('should match snapshot', () => {
    const { asFragment } = render(<Slider />);
    expect(asFragment()).toMatchSnapshot();
  })
  // 預期滑鼠移動到相片上，相片會停止輪播
  it('should have class stop', () => {
    render(<Slider />);
    // 滑鼠還沒移到相片上的，相片不會停止輪播
    expect(screen.queryByTitle(/slide/i)).not.toHaveClass('stop-slide');
    // 滑鼠移到相片上
    fireEvent.mouseEnter(screen.queryAllByAltText(/slide/i)[0]);
    // 相片停止輪播
    expect(screen.getByTitle(/slide/i)).toHaveClass('stop-slide');
    // 滑鼠移出相片
    fireEvent.mouseOut(screen.queryAllByAltText(/slide/i)[0]);
    // 相片繼續輪播
    expect(screen.queryByTitle(/slide/i)).not.toHaveClass('stop-slide');
  })

})