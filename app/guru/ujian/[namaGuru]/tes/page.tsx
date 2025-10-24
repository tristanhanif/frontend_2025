export default function tesPage({ params }: { params: { namaGuru: string } }) {
  return <>
  <h1>Guru</h1>
  <p>Nama Guru: {params.namaGuru}</p>
  </>;
}
