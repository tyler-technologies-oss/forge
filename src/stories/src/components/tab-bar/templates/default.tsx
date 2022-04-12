import { Story } from "@storybook/react";
import { ITabBarComponent, IconRegistry } from '@tylertech/forge';
import { ForgeIcon, ForgeTab, ForgeTabBar } from "@tylertech/forge-react";
import { tylIconHeart } from '@tylertech/tyler-icons/extended';
import React, { useEffect, useRef } from "react";
import { ITabBarProps } from "../tab-bar-args";

export const DefaultTemplate: Story<ITabBarProps> = ({
  layoutMode = 'fixed',
  layoutAlign = 'start',
  underline = true,
  autoActivate = false,
  stacked = false,
  scrollButtons = false,
  disabled = false,
  stretch = false,
}) => {
  useEffect(() => {
    IconRegistry.define([tylIconHeart]);
  }, []);
  const tabBarRef = useRef<ITabBarComponent>();
  const tabBarProps = {
    layoutMode,
    layoutAlign,
    underline,
    autoActivate,
    stacked,
    scrollButtons,
  };
  const tabProps = {
    disabled,
    stretch,
  };
  useEffect(() => {
    const tabBar = tabBarRef.current as ITabBarComponent;
    tabBar.activateTab(0);
  });
  return (
    <ForgeTabBar ref={tabBarRef} {...tabBarProps} style={{ flex: 1 }}>
      <ForgeTab {...tabProps}>
        {stacked && <ForgeIcon slot="top" name="heart" />}
        Tab one
      </ForgeTab>
      <ForgeTab {...tabProps}>
        {stacked && <ForgeIcon slot="top" name="heart" />}
        Tab two
      </ForgeTab>
      <ForgeTab {...tabProps}>
        {stacked && <ForgeIcon slot="top" name="heart" />}
        Tab three
      </ForgeTab>
    </ForgeTabBar>
  );
};
