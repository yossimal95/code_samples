import React, { useState } from "react";
import './StyledTableAntDesign.css'
import { useTable, usePagination, useGlobalFilter, useExpanded, useSortBy } from "react-table";
import * as XLSX from 'xlsx';

//     "react-table": "^7.8.0",
//     "xlsx": "^0.18.5"
const StyledTableAntDesign = ({ data, columns, hiddenColumns, pageSize, onRowClick, isSelectedTr, withSearch, withToolbar, tableTextAlign }) => {

    const {
        getTableProps,
        headerGroups,
        getTableBodyProps,
        page,
        prepareRow,
        canNextPage,
        canPreviousPage,
        previousPage,
        nextPage,
        pageOptions,
        state,
        setGlobalFilter,
    } = useTable(
        {
            initialState: {
                hiddenColumns: hiddenColumns || [],
                pageSize: pageSize || 10
            },
            columns: columns,
            data: data
        },
        useGlobalFilter,
        useSortBy,
        useExpanded,
        usePagination,
    );

    const { globalFilter, pageIndex, expanded } = state;

    const getTrClassName = (row) => {
        if (isSelectedTr) {
            if (isSelectedTr(row)) {
                return 'tr_selected'
            }
        }
        return '';
    }

    return (
        <div className="styled_table_container">
            {
                withToolbar &&
                <div className="tool_bar">
                    {
                        withSearch &&
                        <Search search={globalFilter} setSearch={setGlobalFilter} />
                    }
                    {
                        withSearch &&
                        <Excel data={data} />
                    }
                </div>
            }
            <table className={'styled_table'} {...getTableProps()} style={{ textAlign: (tableTextAlign || 'unset') }}>
                <thead>
                    {
                        headerGroups.map((headerGroup) => {
                            return <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map((header) => {
                                        return <th {...header.getHeaderProps({ ...header.getSortByToggleProps(), style: { width: header?.width } })}>
                                            <span className="splitter">
                                                {header.render('Header')}
                                                {
                                                    <span style={{ left: '10px', fontWeight: 'bold', position: 'absolute' }}>
                                                        {header.isSorted
                                                            ? header.isSortedDesc
                                                                ? '\u2193'
                                                                : '\u2191'
                                                            : ''}
                                                    </span>
                                                }
                                            </span>
                                        </th>
                                    })
                                }
                            </tr>
                        })
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map((row) => {
                            prepareRow(row);
                            return <React.Fragment key={row.id}>
                                <tr {...row.getRowProps()} onClick={(e) => { onRowClick && onRowClick(e, row) }} className={getTrClassName(row)}>
                                    {
                                        row.cells.map((cell) => {
                                            return <td {...cell.getCellProps({})} title={cell?.value}>
                                                {
                                                    cell.render('Cell')
                                                }
                                            </td>
                                        })
                                    }
                                </tr>
                            </React.Fragment>
                        })
                    }
                </tbody>
            </table>
            <div className={'table_paging_bar'}>
                <div className={'paging_navbar total_count'}>
                    סה"כ {data?.length} רשומות
                </div>
                <div className={'paging_navbar'}>
                    <button title="הקודם" type="button" className={`button ${(canPreviousPage ? 'button_active' : 'button_disabled')}`} onClick={(e) => { previousPage(); }} disabled={!canPreviousPage}>
                        <div className={'arrow_container'}>
                            <ArrowSvg width={14} height={14} fill={canPreviousPage ? '#636e7b' : 'silver'} />
                        </div>
                    </button>
                    <p className={'paging_text'}>
                        {
                            `עמוד ${pageIndex + 1} מתוך ${pageOptions.length}`
                        }
                    </p>
                    <button title="הבא" type="button" className={`button  ${(canNextPage ? 'button_active' : 'button_disabled')}`} onClick={(e) => { nextPage(); }} disabled={!canNextPage}>
                        <div className={'arrow_container'}>
                            <ArrowSvg width={14} height={14} rotete={180} fill={canNextPage ? '#636e7b' : 'silver'} />
                        </div>
                    </button>
                </div>
            </div>
        </div >
    );
}

export default StyledTableAntDesign;

const Search = ({ search, setSearch }) => {

    const [searchIsOpen, setSearchIsOpen] = useState(false);

    const handleClick = () => {
        if (searchIsOpen) {
            setSearch('');
            setSearchIsOpen(false);
        }
        else {
            setSearchIsOpen(true);
        }
    }

    return (
        <div style={{ width: (searchIsOpen ? '207px' : '30px'), borderRadius: (searchIsOpen ? '7px' : '50%'), paddingRight: (searchIsOpen ? '3px' : '0px') }} className="button filter_button">
            <div className="filter_button_svg" title="סינון" onClick={handleClick}>
                {
                    searchIsOpen ?
                        <CloseSvg width={20} height={20} fill={'#323232'} />
                        :
                        <SearchSvg width={20} height={20} fill={'#323232'} />
                }
                {
                    searchIsOpen &&
                    <div className="filter_input" onClick={(e) => { e.stopPropagation(); }}>
                        <input value={search || ''} onInput={(e) => { setSearch(e.target.value) }} type="text" placeholder="חפש כאן.." />
                    </div>}
            </div>
        </div>
    );
}

const Excel = ({ data }) => {
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.sheet_add_aoa(worksheet, [["מזהה", "שם פרי", "מחיר", "צבע"]]);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'fileName.xlsx');
    };

    return (
        <div className="button filter_button">
            <div className="filter_button_svg" title="הורדה" onClick={exportToExcel}>
                <ExcelSvg width={20} height={20} fill={'#323232'} />
            </div>
        </div>
    );
}

const ArrowSvg = ({ width, height, rotete, fill }) => {
    return <svg width={width} height={height} fill={fill || 'black'} style={{ transform: rotete ? `rotate(${rotete}deg)` : 'none' }} viewBox="64 64 896 896" focusable="false" aria-hidden="true">
        <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
    </svg>
}

const SearchSvg = ({ width, height, fill }) => {
    return <svg width={width} height={height} fill={fill} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
        <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path>
    </svg>
}

const CloseSvg = ({ width, height, fill }) => {
    return <svg width={width} height={height} fill={fill} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
    </svg>
}

const ExcelSvg = ({ width, height, fill }) => {
    return <svg width={width} height={height} fill={fill} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
        <path d="M5 20h14v-2H5zM19 9h-4V3H9v6H5l7 7z"></path>
    </svg>
}
