import React, { useState, useEffect } from "react";
import { useQueryParam, StringParam } from 'use-query-params';
import cachedFetch from "../../utils/cachedFetch";
import Locationbar from "./Locationbar";
import FsItem from "./FsItem";
import MultiSelectList from "../MultiSelect/MultiList"

import "../iconColors.css"
import "./Browse.css"


function upPath(path) {
    return path.slice(0, path.lastIndexOf('\\'))
}

function sortFiles(a, b) {
    if (a.hidden !== b.hidden) { return a.hidden ? 1 : -1 }
    else { return 0 }
}

function Roots({setPath}) {
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

function useItems(path, initialItems = []) {
    const [items, setItems] = useState(initialItems)
    useEffect(() => {
        const url = `/api/browse?path=${path}`
        cachedFetch(url)
            .then(res => res.json())
            .then(({results}) => {
                // results.filter(item => item.is_folder).forEach(({path, name}) => cachedFetch(`/api/browse?path=${path ? (path + '\\' + name) : name}`))
                setItems(results.sort(sortFiles))
            })
    }, [path])

    return items
}

function Browse() {

    const [path, setPath] = useQueryParam("path", StringParam);
    const items = useItems(path)
    const [focus, setFocus] = useState(-1)
    useEffect(()=> {if(!path) {setPath("")}},[path, setPath])

    useEffect(() => {
        const onKeyDown = (e) => {
            console.log(e)
            if (e.altKey && e.key === "ArrowUp") {
                    setPath(upPath(path))
            }
        }
        document.addEventListener("keydown",onKeyDown)

        return (() => document.removeEventListener("keydown", onKeyDown))
    });

    return (
        <div className="browse-area">
            <Locationbar path={path} setPath={setPath} />
            {/* <pre>{JSON.stringify(useQuery(), null, 2)}</pre> */}
            <div className="browse-results-area">
                <div className="browse-table-wrapper">
                    <table className="browse-table">
                        <thead className="browse-table-head">
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Size</th>
                                <th>Contents</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(path === "") ? <Roots setPath={setPath} focus={focus} /> : ''}
                        {items.map((item,i) => <FsItem key={item.name} item={item} setPath={setPath} active={i === focus} />)}
                        {/* <MultiSelectList onFocusChange={setFocus}>
                        {items.map((item,i) => <FsItem key={item.name} item={item} setPath={setPath} active={i === focus} />)}
                        </MultiSelectList> */}
                        </tbody>
                    </table>
                </div>
                <ul className="results-list">
                    
                </ul>
                {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
            </div>
        </div>
    );
}

export default Browse;
