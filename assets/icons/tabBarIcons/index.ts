import HomeIcon from "./home";
import SaveIcon from "./save";
import PlusIcon from "./plus";
import BellIcon from "./bell";
import ProfileIcon from "./user";

export { HomeIcon, SaveIcon, PlusIcon, BellIcon, ProfileIcon };

export interface IIconProps {
  width: number;
  height: number;
  fill: string;
  selectedTab?: string;
}
