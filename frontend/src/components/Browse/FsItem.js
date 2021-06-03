import React, { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faCog, faFile } from '@fortawesome/free-solid-svg-icons';
import { isToday, isThisMonth, isThisYear, format as formatDate } from 'date-fns'
import filesize from "filesize"

import getIcon from "../icon.js"

import './FsItem.css'
import { OpenButton, CopyButton } from "../Buttons.js";
import useEventListener from "../MultiSelect/utils/useEventListener.js";
import useClipboard from "react-use-clipboard";

const openExternal = path => fetch(`/api/open?path=${path}`)

const fmt = d => {
    let format = ''
    if (isToday(d)) {
        format = 'HH:mm'
    } else if (isThisMonth(d)) {
        format = 'd MMM HH:mm'
    } else if (isThisYear(d)) {
        format = 'd MMM'
    } else {
        format = 'd MMM yyyy'
    }
    return formatDate(d, format)
}

function FsItem({ item, setPath = () => { }, active = false }) {
    const { name, is_folder, size_bytes, path, hidden, read_only, system, modified_time, num_files, num_subfolders, folder_size_bytes } = item;
    const icon = is_folder ? faFolder : getIcon(name);
    const fullName = path ? (path + '\\' + name) : name
    let href = "", onClick = () => { }, size = "";
    if (is_folder) {
        href = "/browse?path=D:\\Downloads";
        onClick = (e) => {
            e.preventDefault();
            setPath(fullName);
        };
        size = size = <span className="size">{filesize(folder_size_bytes, { round: 1 })} ({num_files} <FontAwesomeIcon icon={faFile} className="tiny-icon" /> {num_subfolders} <FontAwesomeIcon icon={faFolder} className="tiny-icon" />)</span>
    }
    else {
        size = <span className="size">{filesize(size_bytes, { round: 1 })}</span>
    }

    const nameRef = useRef(null)

    const [, copyFullName] = useClipboard(fullName);

    useEventListener('keydown', e => {
        if (!active) return;
        const { key, shiftKey, ctrlKey, altKey } = e;
        const keyWithModifiers = (ctrlKey ? 'CTRL+' : '') + (altKey ? 'ALT+' : '') + (shiftKey ? 'SHIFT+' : '') + key
        switch (keyWithModifiers) {
            case "Enter":
                nameRef.current.click()
                break;
            case "CTRL+Enter":
                openExternal(fullName)
                break;
            case "CTRL+c":
                copyFullName()
                break;
            default:
                break;
        }
    })

    const modified = modified_time ? <span className="mod-time">{fmt(new Date(modified_time))}</span> : ''

    const className = [
        'filesystem-item',
        read_only ? 'read-only' : '',
        hidden ? 'hidden' : '',
        system ? 'system' : '',
        active ? 'active' : '',
    ].join(' ')

    return (<tr className={className}>

        <td className="fs-item-icon-wrapper">
        <OptionalA href={href} className="item-link browse-icon-link" linkClassName="live-link" onClick={onClick}>
            <FontAwesomeIcon icon={icon} fixedWidth className="item-icon" />
            {system ? <FontAwesomeIcon icon={faCog} className="system-icon" /> : ""}
            </OptionalA>
        </td>
        <td className="name" ref={nameRef}>
            <OptionalA href={href} className="item-link browse-name-link" linkClassName="live-link" onClick={onClick}>
                {name}
                </OptionalA>
        </td>

        <td>{size}</td>
        <td>{modified}</td>
        <td><OpenButton location={fullName} />
        <CopyButton text={fullName} /></td>
    </tr>);
}

function OptionalA({ children, href = "", className = "", linkClassName = "", ...props }) {
    if (href) {
        return <a href={href} className={className + " " + linkClassName} {...props}>
            {children}
        </a>;
    }
    else {
        return <span className={className} {...props}> {children}</span>;
    }
}

export default FsItem;