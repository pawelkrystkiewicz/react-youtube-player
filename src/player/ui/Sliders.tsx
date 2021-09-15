import React from 'react'
import { Direction } from 'react-player-controls'
import styled, { keyframes } from 'styled-components'
import { toProgressPercent } from '../helper'
import { StyledDIV } from '../types/styled'
import { SliderCommonProps } from '../types/types'
import { COLORS, CONSTANTS as C, } from './colors'

type DotProps = StyledDIV & SliderCommonProps & { visible: boolean }
type BarProps = StyledDIV & SliderCommonProps

const pulse = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
export const Dot: React.FunctionComponent<DotProps> = styled.div`
  opacity: ${({ visible }: DotProps) => (visible ? 1 : 0)};
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 100%;
  transform: scale(1);
  transition: transform 0.2s;
  padding: 5px;

  z-index: ${({ z }: DotProps) => (z ? z : 1)};
  background-color: ${({ background }: DotProps) =>
    background ? background : COLORS.YT_RED};

  ${({ direction, value }: DotProps) =>
    direction !== Direction.VERTICAL
      ? `top: 0;
        left: ${toProgressPercent(value)}%;
        margin-top: -4px;
        margin-left: -8px;
      `
      : `left: 0;
        bottom: ${toProgressPercent(value)}%;
        margin-bottom: -8px;
        margin-left: -4px;`}

  animation: ${pulse} 1s ease-in-out;
`

export const Bar: React.FunctionComponent<BarProps> = styled.div`
  border-radius: 0;
  position: absolute;
  z-index: ${({ z }: BarProps) => (z ? z : 1)};
  background-color: ${({ background }: BarProps) =>
    background ? background : COLORS.GREY_ALPHA};
  ${({ direction, value }: BarProps) =>
    direction !== Direction.VERTICAL
      ? `
      top: 0;
      left:0;
      bottom:0;
      width: ${toProgressPercent(value)}%;
      `
      : `
      left:0;
      bottom:0;
      right: 0;
      height: ${toProgressPercent(value)}%;
      `}

  &:hover {
    transform: scaleY(1.5);
  }
`
export const Chapter: React.FunctionComponent<BarProps> = styled.div`
  height: 100%;
  border-radius: 0;
  z-index: ${({ z }: BarProps) => (z ? z : 1)};
  background-color: ${({ background }: BarProps) =>
    !!background ? background : COLORS.GREY_ALPHA};
  width: ${({ value }: BarProps) =>
    `calc(${toProgressPercent(value)}% - ${C.CHAPTERS_BAR_SPACING}px)`};

  &:hover {
    transform: scaleY(1.5);
  }
`

export const ChaptersContainer: React.FunctionComponent<StyledDIV> = styled.div`
  position: absolute;
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  column-gap: ${C.CHAPTERS_BAR_SPACING}px;

  top: 0;
  left: 0;
  bottom: 0;

  &:hover {
    transform: scaleY(1.5);
  }
`

export interface FollowingTooltipProps extends StyledDIV {
  value: number
  position: number
}

export const FollowingTooltip: React.FunctionComponent<FollowingTooltipProps> = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  align-content: center;

  position: absolute;
  bottom: 100%;
  transform: translateX(-50%);
  padding: 8;
  border-radius: 3;
  color: #fff;
  font-size: 12;
  font-weight: 'bold';
  text-align: 'center';
  margin-bottom: 10px;
  left: ${({ position }: FollowingTooltipProps) =>
    toProgressPercent(position)}%;
`

export const TooltipChapter: React.FunctionComponent<StyledDIV> = styled.div`
  max-width: ${C.CHAPTERS_TOOLTIP_WIDTH}px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
