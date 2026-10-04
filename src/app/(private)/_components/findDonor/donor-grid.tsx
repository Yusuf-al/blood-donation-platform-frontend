
import { Donor } from "@/types/donor.types";
import DonorCard from "./donor-card";
import EmptyDonors from "./empty-donors";

interface DonorGridProps {
    donors: any;
}

export default function DonorGrid({ donors }: DonorGridProps) {
    if (!donors.length) {
        return <EmptyDonors />;
    }
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {donors.map((donor: any) => (
                <DonorCard key={donor.id} donor={donor} />
            ))}
        </div>
    );
}