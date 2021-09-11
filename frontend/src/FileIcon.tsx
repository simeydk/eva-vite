import React from "react";
import { initializeFileTypeIcons, getFileTypeIconAsHTMLString, FileIconType } from '@fluentui/react-file-type-icons';

initializeFileTypeIcons();


function getExt(filename: string): string {
    return filename.substr(filename.lastIndexOf('.') + 1).toLowerCase();    
}

export function FileIcon({ext, className, ...props}: {ext:string, className: string}): JSX.Element {
	if (ext==="folder") { return <div className={className} {...props}><img src="https://spoprod-a.akamaihd.net/files/fabric-cdn-prod_20210115.001/assets/item-types/32/folder.svg" alt="" /></div>}
	ext = getExt(ext)
    return <div  dangerouslySetInnerHTML={{ __html: getFileTypeIconAsHTMLString({ extension: ext, imageFileType: 'svg',size:32 }) || '' }} className={className} {...props} />;
}
