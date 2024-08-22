export default function Page({params} : {params:{id:string | string[]} }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            프로덕트[{params.id}] 페이지
        </div>
    );
}
