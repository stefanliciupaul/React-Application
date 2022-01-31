import { useEffect, useState } from "react";
import store from "./CompanyDB";
import AddCompanyForm from "./AddCompanyForm"
import Company from "./Company";
import FilterCompanyForm from "./FilterCompanyForm";
import FoundersDetails from "./FoundersDetails";
import AddFoundersForm from "./AddFoundersForm";

function CompanyList() {

    const [companies, setCompanies] = useState([]);
    const [founders, setFounders] = useState([]);
    const [areFiltered, setFiltered] = useState(false);
    const [areSorted, setSorted] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        if(selectedCompany){
            store.getFounders(selectedCompany.id);
            store.emitter.addListener('GET_FOUNDERS_SUCCESS', () => {
                setFounders(store.foundersData);
            })
        }
        if (areFiltered) {
            store.emitter.addListener('GET_COMPANIES_FILTER_SUCCESS', () => {
                setCompanies(store.data);
            })
        }
        else if (areSorted) {
            store.getSortedCompanies();
            store.emitter.addListener('GET_COMPANIES_SORTED_SUCCESS', () => {
                setCompanies(store.data);
            })
        }
        else {
            store.getCompanies();
            store.emitter.addListener('GET_COMPANIES_SUCCESS', () => {
                setCompanies(store.data);
            })
        }

    }, [areFiltered, areSorted, selectedCompany])

    const addCompany = (company) => {
        store.addCompany(company);
    }

    const addFounder = (name, role, companyId) => {
        store.addFounder(name, role, companyId);
    }

    const saveCompany = (id, company) => {
        store.saveCompany(id, company);
    }

    const deleteCompany = (id) => {
        store.deleteCompany(id);
    }

    const filterCompany = (name, year) => {
        store.filterCompany(name, year)
        setFiltered(true);
    }

    const onDeleteFounder = (id, companyId) => {
        store.deleteFounder(id, companyId);
    }

    return (
        <div className="flex-container">
            <div>
                <AddCompanyForm onAdd={addCompany} />
                <FilterCompanyForm onFilter={filterCompany} setFiltered={setFiltered} setSorted={setSorted} />
            </div>
            <div id="founders-part">
                <h2>Founders:</h2>
                {selectedCompany ?
                    founders.map((e) => <FoundersDetails key={e.id} item={e} onDeleteFounder={onDeleteFounder}/>) : <div></div>
                }
                {selectedCompany ? 
                <div><AddFoundersForm onAdd={addFounder} companyId={selectedCompany.id} /></div> : <div></div>
                }
            </div>
            <div id="companies-list">
                <hr></hr>
                <h2>List of companies</h2>
                {
                    companies.map((e) => <Company key={e.id} item={e} onSave={saveCompany} onDelete={deleteCompany} setSelectedCompany={setSelectedCompany} />)
                }
            </div>
            
        </div>
    );
}

export default CompanyList;