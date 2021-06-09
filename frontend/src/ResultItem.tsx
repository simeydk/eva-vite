import React from "react";
import filesize from 'filesize';
import * as HeroIconsSolid from '@heroicons/react/solid';
import useClipboard from "react-use-clipboard";
import Highlighter from "react-highlight-words";

import { initializeFileTypeIcons, getFileTypeIconAsHTMLString } from '@fluentui/react-file-type-icons';

initializeFileTypeIcons();

import { formatDate } from "./utils/formatDate";
import { openExternal } from "./App";

export function ResultItem({ result, query="" }) {
	
	const terms = query.split(/\s+/)
	const fullName = result.path ? (result.path + '\\' + result.name) : result.name

	const ext = getExt(result.name)

	const FileIcon = () => <div className="h-8 w-8" dangerouslySetInnerHTML={{__html: getFileTypeIconAsHTMLString({extension:ext,imageFileType:'svg'}) || ''}} />;

	const [, copyFullName] = useClipboard(fullName);

    return <tr className="hover:bg-blue-50">
        <td className="p-5 pr-2 w-10">
            <div className="flex items-center justify-center h-8 w-8 rounded-md ring-blue-500 ring-offset-2 ring-offset-gray-100 ">
                <FileIcon />
            </div>
        </td>
        <td className="p-2">
            <p className="text-gray-900 font-medium truncate">
				<Highlighter searchWords={terms} textToHighlight={result.name} highlightClassName="bg-yellow-100 rounded" />
			</p>
			{/* <div dangerouslySetInnerHTML={{__html: getFileTypeIconAsHTMLString({extension:'docx',imageFileType:'svg'}) || ''}}></div> */}
            <div className="flex gap-1">
                <div className="flex-shrink-0 text-blue-300 -mt-px w-4 h-4">
					<HeroIconsSolid.FolderIcon />
                </div>
                <p className="text-gray-600 text-sm leading-none">{result.path}</p>
            </div>
        </td>
        <td className="p-2 max-w-2">
            <p className="text-gray-900 truncate text-sm">{filesize(result.size_bytes)}</p>
            <p className="text-gray-900 truncate text-sm">{formatDate(new Date(result.modified_time))}</p>
        </td>
        <td className="p-4 pr-5">
            <div className="flex w-full justify-end">
                <div className="flex border rounded text-gray-300 bg-gray-50 overflow-hidden divide-x w-max">
                    <button className="p-2 flex-grow-0 hover:text-green-700 hover:bg-green-200" onClick={() => openExternal(fullName)}>
                        <div className="w-4 h-4">
                            <HeroIconsSolid.ExternalLinkIcon className="h-5 w-5" />
                        </div>
                    </button>
                    <button className="p-2 flex-grow-0 hover:text-green-700 hover:bg-green-200" onClick={() => openExternal(result.path)}>
                        <div className="w-4 h-4">
                            <HeroIconsSolid.FolderIcon className="h-5 w-5" />
                        </div>
                    </button>
                    <button className="p-2 flex-grow-0 hover:text-blue-700 hover:bg-blue-200" onClick={() => copyFullName()}>
						<HeroIconsSolid.ClipboardIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </td>
    </tr>;
}


function getExt(filename) {
    return filename.substr(filename.lastIndexOf('.') + 1).toLowerCase();    
}