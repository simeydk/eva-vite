import React, { useState } from 'react';
import { formatDate } from "./utils/formatDate";
import { FileIcon } from './FileIcon';
import filesize from 'filesize';
import { FileSystemItemData, useItems, openExternal } from './browse';
import { ChevronRightIcon } from '@heroicons/react/solid';

export function Item({ item, setLocation, openExternal, depth = 0 }: { item: FileSystemItemData; setLocation: (x: string) => any; openExternal: (x: string) => any; depth: number; }) {
  const { path, name, is_folder, modified_time, size_bytes, folder_size_bytes, num_files, num_subfolders, hidden, system } = item;
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = is_folder ? () => setExpanded(x => !x) : () => null;
  const fullName = path + '\\' + name;

  const onDoubleClick = () => {
    if (is_folder) {
      setLocation(fullName);
    } else {
      openExternal(fullName);
    }

  };

  return <><tr className={`${hidden || system ? 'text-gray-300' : 'text-gray-900'} hover:bg-blue-50 cursor border-none`} onDoubleClick={onDoubleClick}>
    <td className="text-left px-2 w-full whitespace-nowrap flex">
      
      <div className="flex gap-1 items-center py-0.5">
	  	{Array.from({length: depth}).fill(<div className="w-5 h-5 flex"><div className="w-1/2 border-r border-blue-300" /></div>)}
        <button onClick={toggleExpanded} className={`relative  filter ${(is_folder && (folder_size_bytes === 0)) ? 'grayscale' : '' }`}>
          <FileIcon ext={is_folder ? "folder" : name} className={`w-5 h-5`} />
		  {is_folder ? <div className={`absolute inset-0 flex justify-center items-center pt-0.5`}><ChevronRightIcon className={`w-3 h-3 text-yellow-600 transition transform ${expanded ? 'rotate-90' : ''}`}/></div> : null}
        </button>
        <span className="truncate max-w-xl">{name}</span>
      </div>
    </td>
    <td className="text-right px-2 py-0.5 w-40 whitespace-nowrap text-gray-500">
      {formatDate(new Date(modified_time))}
    </td>
    {/* <td className="text-left px-2 py-0.5 w-40 whitespace-nowrap text-gray-500">
          File folder
        </td> */}
    <td className="text-right px-2 py-0.5 w-40 whitespace-nowrap text-gray-500">
      {filesize(size_bytes || folder_size_bytes)}
    </td>
    <td className="text-right px-2 py-0.5 w-40 whitespace-nowrap text-gray-500">
      {is_folder ? `${num_subfolders.toLocaleString()}` : null}
    </td>
    <td className="text-right px-2 py-0.5 w-40 whitespace-nowrap text-gray-500">
      {is_folder ? `${num_files.toLocaleString()}` : null}
    </td>
  </tr>
    {expanded ? <ItemList path={fullName} setLocation={setLocation} depth={depth + 1} /> : null}
  </>;
}
function ItemList({ path, setLocation, depth = 0 }: { path: string; setLocation: (x: string) => any; depth: number; }) {
  const items = useItems(path);
  return <>{items.map(item => <Item key={item.name} item={item} setLocation={setLocation} openExternal={openExternal} depth={depth} />)}</>;

}
