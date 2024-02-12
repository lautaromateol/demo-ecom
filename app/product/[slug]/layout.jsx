async function getProduct(slug){
    try {
        const response = await fetch(`${process.env.API}/product/${slug}`, {
            method: "GET",
            next: { revalidate: 1 }
        })
        const data = await response.json()
        return data
    } catch (error) {
        
    }
}

export default async function ProductViewLayout({ children, params }) {

    const { product } = await getProduct(params?.slug)

    return (
        <>
            <head>
                <title>{product?.title}</title>
                <meta name="description" content={product?.description}/>
            </head>
            {children}
        </>
    )
}
