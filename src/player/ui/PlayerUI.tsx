import React from 'react'
import styled from 'styled-components'

type StyledDIV = React.HTMLAttributes<HTMLDivElement>

export const Container: React.FunctionComponent<StyledDIV> = styled.div`
  position: absolute;
  bottom: 0px;
  max-width: 100%;
  width: 100%;
`
export const Body: React.FunctionComponent<StyledDIV> = styled.div`
  position: relative;
  width: 100%;
  &:hover ${Container} {
    opacity: 1;
  }

  ${Container} {
    opacity: 0;
    transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);
  }

  color: #fff;
  font-size: 13px;
`

export const VolumeBarWrapper: React.FunctionComponent<StyledDIV> = styled.div`
  height: 4px;
  width: 0;
  opacity: 0;
  transition: all 0.2s 0.2s ease-in-out;

  &:hover {
    width: 50px;
    opacity: 1;
  }
`
export const VolumeControls: React.FunctionComponent<StyledDIV> = styled.div`
  &:hover ~ ${VolumeBarWrapper} {
    width: 50px;
    opacity: 1;
  }
`

export const ControlPanel: React.FunctionComponent<StyledDIV> = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  height: 40px;
  margin: 0 12px;
`

export const Controls: React.FunctionComponent<StyledDIV> = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  flex-wrap: nowrap;
  column-gap: 5px;
  align-items: center;
  align-content: center;
`

export const Chapters: React.FunctionComponent<StyledDIV> = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  flex: 0 1 100%;
  float: left;
`
export const Settings: React.FunctionComponent<StyledDIV> = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  float: right;
`

export enum ButtonIcon {
  'play',
  'pause',
  'volume-muted',
  'volume-full',
  'volume-half',
  'settings',
  'fullscreen',
  'fullscreen-exit',
}

type PlayerButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  icon?: ButtonIcon
}

export const Button: React.FunctionComponent<PlayerButtonProps> = styled.button`
  height: 40px;
  width: 46px;
  flex: 0 0 auto;
  cursor: pointer;
  color: #fff;
  background-color: none;
  background: none;
  border: none;
`

export const TimeTracker: React.FunctionComponent<PlayerButtonProps> = styled.div`
  padding: 0 2px;
`

export const ClickCatcher: React.FunctionComponent<
  StyledDIV & { onMouseLeave?: () => void }
> = styled.div``

export const ErrorMessage: React.FunctionComponent<StyledDIV> = styled.div`
  color: rgba(218, 22, 22, 0.527);
  font-size: 14px;
  padding: 20px;
  border: 1px solid rgba(218, 22, 22, 1);
  margin-top: 10px;
`
export const SettingsBox: React.FunctionComponent<StyledDIV> = styled.div`
  max-width: 500px;
  min-width: 150px;
  min-height: 50px;

  padding: 10px;

  position: absolute;
  bottom: 55px;
  right: 55px;

  background-color: #1c1c1bd5;
  font-size: 13px;
`

export const SettingsRow: React.FunctionComponent<StyledDIV> = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  column-gap: 20px;
  line-height: 2;
`
export const SettingsName: React.FunctionComponent<StyledDIV> = styled.div`
  font-weight: 500;
`
export const SettingsOption: React.FunctionComponent<StyledDIV> = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`

export const SettingsValuesGrid: React.FunctionComponent<StyledDIV> = styled.div`
  display: grid;
  grid-template-columns: 30px auto;
  grid-template-rows: 25px;
  grid-template-areas: 'icon value';
`
export const SettingsValue: React.FunctionComponent<StyledDIV> = styled.div`
  grid-area: value;
  cursor: pointer;
`
export const SettingsIcon: React.FunctionComponent<StyledDIV> = styled.div`
  grid-area: icon;
`
