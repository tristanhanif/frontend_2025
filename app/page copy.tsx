export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      <Button wording="Satu">ok</Button>
      <Card title="NestJS">
        <Button wording="NEstJs">yes</Button>
      </Card>
      <Card title="NextJS">
        <div className="bg-green-500">
          <p className="text-white">
            Saya sedang belajar NestJS untuk menjadi backend developer
          </p>
        </div>
      </Card>

      <Test title="Tabel" >
        <table>
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
              <th>Header 3</th>
            </tr>
          </thead>
        </table>
      </Test>
       <Test title="Lingkaran">
       <div className="h-48 w-48 rounded-full border bg-blue-500"></div>
      </Test>
    </main>
  );
}

function Button({
  wording,
  children,
}: {
  wording: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <h1>{wording}</h1>
      <div className="text-red-500 font-bold">{children}</div>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className=" border border-red-500 mt-5 rounded-lg  shadow-md px-2">
      <div className="border-b border-red-500  py-2 ">
        <h5 className="font-bold text-red-500"> {title}</h5>
      </div>
      <div className="py-3 text-sm p-5 rounded-2xl shadow-2xl">{children}</div>
    </section>
  );
}

function Test({ title, children }: { title:string, children: React.ReactNode }) {
  return (
    <div className="bg-green-500">
      <p className="text-white">
       {title}
      </p>

      <div className="border mt-5 px-5 bg-red-500">{children}</div>
    </div>
  );
}