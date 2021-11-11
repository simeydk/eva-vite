import React, { JSXElementConstructor, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import cachedFetch from "./utils/cachedFetch";
import { LocationBar } from './LocationBar';

import './index.css'
import { Item } from './Item';


ReactDOM.render(
  <React.StrictMode>
    <BrowseApp />
  </React.StrictMode>,
  document.getElementById('root')
)

const API = '/api'
export const openExternal = (path: string) => fetch(`${API}/open?path=${path}`)

function upPath(path: string) {
  return path.slice(0, path.lastIndexOf('\\'))
}

function sortFiles(a, b) {
  if (a.hidden !== b.hidden) { return a.hidden ? 1 : -1 }
  else { return 0 }
}

function Roots({ setPath }) {
  const [roots, setRoots] = useState([])
  useEffect(() => {
    cachedFetch('./api/settings')
      .then(res => res.json())
      .then(x => setRoots(x.folders.split('\n')))
  }, [])

  return roots.map(root => {
    return <FsItem key={root} item={{ name: root, path: "", is_folder: true, num_files: 0, num_subfolders: 0, folder_size_bytes: 0 }} setPath={setPath} />
  })
}

export function useItems(path: string, initialItems = []): FileSystemItemData[] {
  const [items, setItems] = React.useState(initialItems)
  React.useEffect(() => {
    const url = `/api/browse?path=${path}`
    cachedFetch(url)
      .then(res => res.json())
      .then(({ results }) => {
        // results.filter(item => item.is_folder).forEach(({path, name}) => cachedFetch(`/api/browse?path=${path ? (path + '\\' + name) : name}`))
        setItems(results.sort(sortFiles))
      })
  }, [path])

  return items
}

function BrowseApp() {

  const [location, setLocation] = React.useState("I:",);
  const items = useItems(location)

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.altKey && e.key === "ArrowUp") {
        setLocation(upPath(location))
      }
      if (e.key === "a") console.log(location)
    }
    document.addEventListener("keydown", onKeyDown)
    return (() => document.removeEventListener("keydown", onKeyDown))
  }, [location]);

  useEffect(() => {
    if (items.length === 0) return
    if (items[0].path === location) return
    setLocation(items[0].path)
  }, [items])

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      {/* File Menu Bar */}
      {/* <FileMenuBar /> */}
      {/* Top Bar */}
      <div className="flex-shrink-0 p-2 flex gap-2 text-gray-900 border-b">
        {/* Left button bar */}
        <div className="flex items-center">
          <button className="w-8 h-8 rounded items-center justify-center flex text-gray-400 hover:bg-gray-300 transition duration-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="w-8 h-8 rounded items-center justify-center flex text-gray-400 hover:bg-gray-300 transition duration-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="w-8 h-8 rounded items-center justify-center flex text-gray-400 hover:bg-gray-300 transition duration-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="w-8 h-8 rounded items-center justify-center flex text-gray-400 hover:bg-gray-300 transition duration-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        {/* Location Bar */}
        <div className="flex-grow flex">
          <LocationBar {...{ location, setLocation }} />
        </div>
        <div className="w-40">
          <span className="flex items-center leading-none p-2 rounded bg-gray-200 border text-gray-900 justify-between group focus-within:bg-white focus-within:ring-2 ring-black">
            <input type="text" placeholder="Search for files" className="bg-transparent w-full flex-grow focus:outline-none" defaultValue="hello" />
            <span className="pl-2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </span>
          </span>
        </div>
      </div>
      {/* Main Area */}
      <div className="flex-grow flex overflow-auto bg-white">
        {/* Sidebar */}
        <SideBar />
        <div className="flex-grow flex flex-col overflow-y-auto text-sm max-w-screen-lg bg-white">
          <table className="table-auto">
            <tbody><tr className="divide-x text-gray-500">
              <th className="font-normal text-left px-2 py-1 w-full">
                Name
              </th>
              <th className="font-normal text-right px-2 py-1 w-40 whitespace-nowrap">
                Date modified
              </th>
              {/* <th className="font-normal text-right px-2 py-1 w-40 whitespace-nowrap">
                Type
              </th> */}
              <th className="font-normal text-right px-2 py-1 w-40 whitespace-nowrap">
                Size
              </th>
              <th className="font-normal text-right px-2 py-1 w-40 whitespace-nowrap">
                Folders
              </th>
              <th className="font-normal text-right px-2 py-1 w-40 whitespace-nowrap">
                Files
              </th>
            </tr>
            </tbody><thead>
            </thead>
            <tbody className="">
              {items.map((item: FileSystemItemData) => <Item key={item.name} item={item} setLocation={setLocation} openExternal={openExternal} />)}





            </tbody>
          </table>
          {/* <div class="p-4 flex-grow flex">
  <div class="border-2 border-dashed flex-grow flex items-center justify-center text-lg text-gray-300 font-semibold">
    Main Area
  </div>
</div> */}
        </div>
      </div>
      {/* Bottom Bar */}
      <BottomBar />
    </div>

  )

}

export interface FileSystemItemData {
  accessed_time: string;
  created_time: string;
  folder_size_bytes: number;
  hidden: boolean;
  is_folder: boolean;
  modified_time: string;
  name: string;
  num_files: number;
  num_subfolders: number;
  path: string;
  readonly: boolean;
  size_bytes: number;
  system: boolean;
}


function BottomBar() {
  return <div className="flex-shrink-0 p-2 text-xs flex px-4 gap-8 text-gray-700 border-t">
    <button>3 Items</button>
    <button>1 item selected</button>
    <button>Available when online</button>
  </div>;
}

function SideBar() {
  return <div className="w-56 overflow-y-auto border-r text-sm bg-white flex">
    <div className="p-2 flex-grow flex">
      <ul className="text-gray-900">
        <li className="text-left px-2 py-0.5 w-full whitespace-nowrap">
          <div className="flex gap-1 items-center">
            <img src="https://spoprod-a.akamaihd.net/files/fabric-cdn-prod_20210115.001/assets/item-types/32/folder.svg" alt="" className="w-5 h-5" />
            <span>Documents</span>
          </div>
        </li>
        <li className="text-left px-2 py-0.5 w-full whitespace-nowrap">
          <div className="flex gap-1 items-center">
            <img src="https://spoprod-a.akamaihd.net/files/fabric-cdn-prod_20210115.001/assets/item-types/32/folder.svg" alt="" className="w-5 h-5" />
            <span>Pictures</span>
          </div>
        </li>
        <li className="text-left px-2 py-0.5 w-full whitespace-nowrap">
          <div className="flex gap-1 items-center">
            <img src="https://spoprod-a.akamaihd.net/files/fabric-cdn-prod_20210115.001/assets/item-types/32/folder.svg" alt="" className="w-5 h-5" />
            <span>Desktop</span>
          </div>
        </li>
        <li className="text-left px-2 py-0.5 w-full whitespace-nowrap">
          <div className="flex gap-1 items-center">
            <img src="https://spoprod-a.akamaihd.net/files/fabric-cdn-prod_20210115.001/assets/item-types/32/folder.svg" alt="" className="w-5 h-5" />
            <span>Documents</span>
          </div>
        </li>
      </ul>
    </div>
  </div>;
}

function FileMenuBar() {
  return <div className="flex justify-between border-b">
    <div className="flex gap-1">
      <button className="py-1 px-4 text-sm bg-indigo-500 text-white hover:bg-indigo-900 transition duration-100"><span className="underline">F</span>ile
      </button><button className="py-1 px-4 text-sm text-gray-700 hover:bg-gray-300 transition duration-100"><span className="underline">E</span>dit
      </button><button className="py-1 px-4 text-sm text-gray-700 hover:bg-gray-300 transition duration-100"><span className="underline">V</span>iew
      </button><button className="py-1 px-4 text-sm text-gray-700 hover:bg-gray-300 transition duration-100"><span className="underline">T</span>ools
      </button><button className="py-1 px-4 text-sm text-gray-700 hover:bg-gray-300 transition duration-100"><span className="underline">H</span>elp
      </button></div>
    <div className="flex gap-1">
      <button className="w-7 h-7 flex items-center justify-center text-gray-400">
        <div className="w-5 h-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </button>
      <button className="w-7 h-7 flex items-center justify-center text-indigo-400">
        <div className="bg-white rounded-full w-5 h-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </div>
      </button>
    </div>
  </div>;
}

