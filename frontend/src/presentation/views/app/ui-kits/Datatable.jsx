// import { useFindManyBooks } from '@/presentation/logics/app/books'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'

const Datatable = () => {
  // const { data, isPending, isError, error } = useFindManyBooks()
  const columns = [
    { field: 'title', header: 'Title' },
    {field: 'series', header: 'Series'},
    { field: 'author', header: 'Author' },
    { field: 'genre', header: 'Genre' },
    { field: 'format', header: 'Format' },
    { field: 'published', header: 'Published Date', body: (rowData) => {
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date(rowData.published))
      }}
  ]

  // if (isPending) return <div>Loading...</div>
  // if (isError) return <div>Error: {error.message}</div>

  return (
    <div className='card'>
      <DataTable
        // value={data}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        scrollable
        scrollHeight='70dvh'
        stripedRows
        tableStyle={{ minWidth: '50rem' }}>
        <Column header='No' body={(rowData, { rowIndex }) => rowIndex + 1} />
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            body={col.body}
          />
        ))}
      </DataTable>
    </div>
  )
}

export default Datatable
