import { domToPng } from "modern-screenshot";
import {
  FileTextIcon,
  FullscreenIcon,
  Loader2Icon,
  MoreVerticalIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "../ui/menu";
import { Text } from "../ui/text";
import { useState } from "react";

interface MoreOptionsProps {
  fileName: string;
}

const MoreOptions = (props: MoreOptionsProps) => {
  const { fileName } = props;

  const [downloading, setDownloading] = useState<boolean>(false);

  const downloadScreenshot = () => {
    const element = document.getElementById("insight-page");
    if (!element) return;

    setDownloading(true);

    domToPng(element)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = fileName;
        link.href = dataUrl;
        link.click();
      })
      .finally(() => {
        setDownloading(false);
      });
  };
  return (
    <div>
      <Menu>
        <MenuTrigger render={<Button size="icon-sm" variant="outline" />}>
          <MoreVerticalIcon />
        </MenuTrigger>
        <MenuPopup>
          <MenuItem onClick={downloadScreenshot}>
            {downloading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <FullscreenIcon />
            )}

            <Text xs>Screenshot</Text>
          </MenuItem>
          <MenuItem>
            <FileTextIcon />
            <Text xs>Download PDF</Text>
          </MenuItem>
        </MenuPopup>
      </Menu>
    </div>
  );
};

export default MoreOptions;
