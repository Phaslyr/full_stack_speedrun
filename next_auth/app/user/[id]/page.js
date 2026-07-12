export default async function User({ params }) {
    const { id } = await params;

    return (
        <div className="h-90 items-center justify-center text-xl text-center">
            <p className="py-3">User Profile: { id }</p>
            <hr />
            <ul className="[&>li]:pt-2">
                <li>Chopped</li>
                <li>Bad at coding</li>
                <li>No gf</li>
                <li>Can&apos;t get a job</li>
            </ul>
        </div>
    );
}