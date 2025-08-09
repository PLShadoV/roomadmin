export function toCSV<T extends Record<string, any>>(rows: T[]): string {
  if(rows.length===0) return ''
  const headers = Object.keys(rows[0])
  const escape = (s: any) => `"${String(s).replaceAll('"','""')}"`
  const lines = [headers.join(',')]
  for(const r of rows){ lines.push(headers.map(h => escape(r[h] ?? '')).join(',')) }
  return lines.join('\n')
}
