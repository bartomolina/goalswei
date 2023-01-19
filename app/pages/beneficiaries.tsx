import Head from "next/head";
import NewBeneficairyForm from "../components/new-beneficiary-form";
import BeneficiariesTable from "../components/beneficiaries-table";

const Beneficiaries = () => {
  return (
    <>
      <Head>
        <title>GoalsWei - Beneficiaries</title>
        <meta name="description" content="GoalsWei - Beneficiaries" />
      </Head>
      <div className="bg-gray-100 pb-24">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 py-8">
          <div className="p-4 md:pt-8 sm:px-0 md:grid md:grid-cols-2 gap-3">
            <div>
              <NewBeneficairyForm />
            </div>
            <div>
              <BeneficiariesTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Beneficiaries;
