import React from "react";
import filesize from 'filesize';
import * as HeroIconsSolid from '@heroicons/react/solid';
import useClipboard from "react-use-clipboard";
import Highlighter from "react-highlight-words";




import { formatDate } from "./utils/formatDate";
import { openExternal } from "./App";
import { FileIcon } from "./FileIcon";

export function ResultItem({ result, query="" }) {
	
    const {hidden, read_only, system} = result

	const terms = query.split(/\s+/)
	const fullName = result.path ? (result.path + '\\' + result.name) : result.name

	const ext = getExt(result.name)

	

	const [, copyFullName] = useClipboard(fullName);

    return <tr className={` hover:bg-blue-50 dark:hover:bg-blueGray-600 ${ hidden ? "bg-gray-100 dark:bg-gray-900" : ""} transition group`}>
        <td className="p-5 pr-2 w-10">
            <div className="flex items-center justify-center h-8 w-8 rounded-md ring-blue-500 ring-offset-2 ring-offset-gray-100 ">
                <FileIcon ext={ext} className="w-8 h-8"/>
            </div>
        </td>
        <td className="p-2">
            <p className="text-gray-800 font-medium truncate dark:text-blueGray-50 transition">
				<Highlighter searchWords={terms} textToHighlight={result.name} highlightClassName="font-bold text-gray-900 bg-white dark:bg-blueGray-700 dark:text-cyan-200 transition group-hover:bg-blue-100 dark:group-hover:bg-blueGray-500" highlightStyle={{}}/>
			</p>
			{/* <div dangerouslySetInnerHTML={{__html: getFileTypeIconAsHTMLString({extension:'docx',imageFileType:'svg'}) || ''}}></div> */}
            <div className="flex gap-1">
                {/* <div className="flex-shrink-0 text-blue-200 -mt-px w-5 h-5 dark:text-blueGray-500">
					<HeroIconsSolid.FolderIcon />
                </div> */}
                <p className="text-gray-500 leading-none dark:text-gray-300 transition">{result.path}</p>
            </div>
        </td>
        <td className="p-2 max-w-2">
            <p className="text-gray-900 truncate text-sm dark:text-gray-100 transition">{filesize(result.size_bytes)}</p>
            <p className="text-gray-900 truncate text-sm dark:text-gray-100 transition">{formatDate(new Date(result.modified_time))}</p>
        </td>
        <td className="p-4 pr-5">
            <div className="flex w-full justify-end">
                <div className="flex border rounded text-gray-300 bg-gray-50 overflow-hidden divide-x w-max dark:bg-blueGray-600 dark:text-blueGray-400 dark:border-blueGray-400 transition">
                    <button className="p-2 flex-grow-0 hover:text-green-700 hover:bg-green-200 dark:hover:bg-green-900 transition" onClick={() => openExternal(fullName)}>
                        <div className="w-4 h-4">
                            <HeroIconsSolid.ExternalLinkIcon className="h-5 w-5" />
                        </div>
                    </button>
                    <button className="p-2 flex-grow-0 hover:text-green-700 hover:bg-green-200 dark:hover:bg-green-900 transition" onClick={() => openExternal(result.path)}>
                        <div className="w-4 h-4">
                            <HeroIconsSolid.FolderIcon className="h-5 w-5" />
                        </div>
                    </button>
                    <button className="p-2 flex-grow-0 hover:text-blue-700 hover:bg-blue-200 dark:hover:bg-blue-900 transition" onClick={() => copyFullName()}>
						<HeroIconsSolid.ClipboardIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </td>
    </tr>;
}


function getExt(filename: string): string {
    return filename.substr(filename.lastIndexOf('.') + 1).toLowerCase();    
}