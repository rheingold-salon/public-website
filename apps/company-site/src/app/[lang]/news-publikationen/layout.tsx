export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode
    params: Promise<{ lang: 'en' | 'de' }>
}>) {
    return (
        <div className="pt-28">{children}</div>
    );

}
