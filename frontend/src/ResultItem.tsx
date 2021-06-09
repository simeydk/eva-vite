import React from "react";
import filesize from 'filesize';
import * as HeroIconsSolid from '@heroicons/react/solid';
import useClipboard from "react-use-clipboard";

import { formatDate } from "./utils/formatDate";
import { openExternal } from "./App";

export function ResultItem({ result }) {

	const fullName = result.path ? (result.path + '\\' + result.name) : result.name

	const [, copyFullName] = useClipboard(fullName);

    return <tr className="hover:bg-blue-50">
        <td className="p-5 pr-2 w-10">
            <div className="flex items-center justify-center h-8 w-8 rounded-md ring-blue-500 ring-offset-2 ring-offset-gray-100 bg-gradient-to-br to-blue-400 from-cyan-400">
                <div className="text-xs text-cyan-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </td>
        <td className="p-2">
            <p className="text-gray-900 font-medium truncate">{result.name}</p>
            <div className="flex gap-1">
                <div className="flex-shrink-0 text-blue-300 -mt-px w-4 h-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
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
