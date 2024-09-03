const App = () => {
    const [selectedRow, setSelectedRow] = useState(null);

    return (
        <div style={{ width: '400px', height: '400px', margin: 'auto' }}>
            <StyledTable
                data={data}
                columns={columns}
                hiddenColumns={['fruitId']}
                isSelectedTr={(row) => { return row?.values?.fruitId == selectedRow?.values?.fruitId }}
                onRowClick={(e, row) => { setSelectedRow(row); }}
                withToolbar={true}
                withSearch={true}
            />
            <div>
                {
                    JSON.stringify(selectedRow?.values)
                }
            </div>
        </div>
    );
};

const columns = [
    {
        Header: 'fruitId',
        accessor: 'fruitId',
        disableGlobalFilter: true,
    },
    {
        Header: 'שם פרי',
        accessor: 'name',
        width: 150
    },
    {
        Header: 'מחיר',
        accessor: 'price',
    },
    {
        Header: 'צבע',
        accessor: 'color',
        disableGlobalFilter: true,
        maxWidth: 70
    }
]

const data = [
    { fruitId: 1, name: 'תפוח', price: 3, color: 'ירוק' },
    { fruitId: 2, name: 'תפוז', price: 4, color: 'כתום' },
    { fruitId: 3, name: 'בננה', price: 2, color: 'צהוב' },
    { fruitId: 4, name: 'אגס', price: 5, color: 'ירוק צהבהב' },
    { fruitId: 5, name: 'אשכולית', price: 6, color: 'סגול' },
    { fruitId: 6, name: 'לימון', price: 3, color: 'צהוב ירוק' },
    { fruitId: 7, name: 'מנגו', price: 7, color: 'כתום' },
    { fruitId: 8, name: 'אננס', price: 5, color: 'צהוב' },
    { fruitId: 9, name: 'אבוקדו', price: 6, color: 'ירוק כהה' },
    { fruitId: 10, name: 'קיווי', price: 4, color: 'ירוק' },
    { fruitId: 11, name: 'פסיפלורה', price: 8, color: 'סגול' },
    { fruitId: 12, name: 'ראמבוטן', price: 7, color: 'אדום' },
    { fruitId: 13, name: 'גויאבה', price: 5, color: 'ורוד' },
    { fruitId: 14, name: 'דרגון פרות', price: 9, color: 'לבן עם ורוד' },
    { fruitId: 15, name: 'תות שדה', price: 4, color: 'אדום' },
    { fruitId: 16, name: 'תות עלית', price: 6, color: 'אדום' },
    { fruitId: 17, name: 'תפוח עץ', price: 3, color: 'ירוק' },
    { fruitId: 18, name: 'פומלו', price: 5, color: 'ורוד' },
    { fruitId: 19, name: 'תמר', price: 4, color: 'חום' },
    { fruitId: 20, name: 'שזיף', price: 6, color: 'צהוב כתום' },
    { fruitId: 21, name: 'משמש', price: 5, color: 'כתום' },
    { fruitId: 22, name: 'אפרסק', price: 4, color: 'כתום' },
    { fruitId: 23, name: 'נקטרינה', price: 5, color: 'צהוב כתום' },
    { fruitId: 24, name: 'מלון', price: 7, color: 'ירוק' },
    { fruitId: 25, name: 'קוקוס', price: 8, color: 'חום' },
    { fruitId: 26, name: 'פפאיה', price: 6, color: 'כתום' },
    { fruitId: 27, name: 'סיידר', price: 5, color: 'ירוק צהוב' },
    { fruitId: 28, name: 'פיטאיה', price: 9, color: 'ורוד' },
    { fruitId: 29, name: `ליצ'י`, price: 7, color: 'אדום' },
    { fruitId: 30, name: 'רימון', price: 6, color: 'אדום' }
];
