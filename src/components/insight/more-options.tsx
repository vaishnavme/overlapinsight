import { domToPng } from "modern-screenshot";
import { useState } from "react";
import {
  FileTextIcon,
  FullscreenIcon,
  Loader2Icon,
  MoreVerticalIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "../ui/menu";
import { Text } from "../ui/text";

interface MoreOptionsProps {
  fileName: string;
}

const MoreOptions = (props: MoreOptionsProps) => {
  const { fileName } = props;

  const [downloading, setDownloading] = useState<boolean>(false);

  const downloadPDF = async () => {
    const element = document.getElementById("insight-page");
    if (!element) return;

    const imageDataUrl = await domToPng(element, {
      quality: 1,
      scale: 2,
    });

    const iframe = document.createElement("iframe");

    iframe.style.position = "fixed";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";

    iframe.srcdoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          @page {
            size: A4;
            margin: 0;
          }
          body {
            margin: 0;
          }
          img {
            width: 100%;
            height: auto;
          }
        </style>
      </head>
      <body>
        <img src="${imageDataUrl}" />
      </body>
    </html>
  `;

    document.body.appendChild(iframe);

    iframe.onload = () => {
      if (iframe.contentWindow) {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      }

      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    };
  };

  const downloadScreenshot = () => {
    const element = document.getElementById("insight-page");
    if (!element) return;

    setDownloading(true);

    domToPng(element, {
      quality: 1,
      scale: 2,
    })
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
          <MenuItem onClick={downloadPDF}>
            <FileTextIcon />
            <Text xs>Download PDF</Text>
          </MenuItem>
        </MenuPopup>
      </Menu>
    </div>
  );
};

export default MoreOptions;
