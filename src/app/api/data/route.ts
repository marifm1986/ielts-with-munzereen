// export async function GET() {
//     const url = "https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course";
//     const res = await fetch(url);
//     const data = await res.json();
//     return Response.json(data);
// }

export async function GET() {
    const url = "https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course"
    const res = await fetch(url)
    const data = await res.json()
    return Response.json(data)
}