export default function dashboardPage({ params }: { params: { id: string; analisisid: string } }) {
  return (
    <>
      <h1>dashboard</h1>
      <p>Ini dashboard dengan id: {params.id}</p>
      <h1>analisis</h1>
      <p>Ini analisis dengan id: {params.analisisid}</p>
    </>
  );
}
