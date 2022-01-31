import { EventEmitter } from 'fbemitter';

const SERVER = 'http://localhost:8080';

class CompanyDB {
    constructor () {
        this.data = []
        this.foundersData = []
        this.emitter = new EventEmitter()
    }

    async getCompanies() {
        try{
            const response = await fetch(`${SERVER}/companies`)
            if(!response.ok){
                throw response
            }
            this.data=await response.json()
            this.emitter.emit('GET_COMPANIES_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_COMPANIES_ERROR')
        }
    }

    async getSortedCompanies() {
        try{
            const response = await fetch(`${SERVER}/companiesalph`)
            if(!response.ok){
                throw response
            }
            this.data=await response.json()
            this.emitter.emit('GET_COMPANIES_SORTED_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_COMPANIES_SORTED_ERROR')
        }
    }

    async addCompany(company) {
        try{
            const response = await fetch(`${SERVER}/companies`,{
                method:'POST',headers: {'Content-Type' : 'application/json'}, body: JSON.stringify(company)
            })
            if(!response.ok){
                throw response
            }
            this.getCompanies()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_COMPANY_ERROR')
        }
    }
    
    async saveCompany(id,company) {
        try{
            const response = await fetch(`${SERVER}/companies/${id}`,{
                method:'PUT',headers: {'Content-Type' : 'application/json'}, body: JSON.stringify(company)
            })
            if(!response.ok){
                throw response
            }
            this.getCompanies()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('SAVE_COMPANY_ERROR')
        }
    }

    async deleteCompany(id) {
        try{
            const response = await fetch(`${SERVER}/companies/${id}`,{
                method:'DELETE'
            })
            if(!response.ok){
                throw response
            }
            this.getCompanies()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('DELETE_COMPANY_ERROR')
        }
    }

    async filterCompany(name, year) {
        try{
            const response = await fetch(`${SERVER}/companiesFlt/${name}/${year}`)
            if(!response.ok){
                throw response
            }
            this.data=await response.json()
            this.emitter.emit('GET_COMPANIES_FILTER_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_COMPANIES_FILTER_ERROR')
        }
    }

    async getFounders(companyId) {
        try{
            const response = await fetch(`${SERVER}/companies/${companyId}/founders`)
            if(!response.ok){
                throw response
            }
            this.foundersData=await response.json()
            this.emitter.emit('GET_FOUNDERS_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_FOUNDERS_ERROR')
        }
    }

    async deleteFounder(id, companyId) {
        try{
            const response = await fetch(`${SERVER}/founders/${id}`,{
                method:'DELETE'
            })
            if(!response.ok){
                throw response
            }
            this.getFounders(companyId);
        } catch(err) {
            console.warn(err)
            this.emitter.emit('DELETE_FOUNDER_ERROR')
        }
    }

    async addFounder(name, role, companyId) {
        try{
            var founders = { name, role, companyId }
            const response = await fetch(`${SERVER}/companies/${companyId}/founders`,{
                method:'POST',headers: {'Content-Type' : 'application/json'}, body: JSON.stringify(founders)
            })
            if(!response.ok){
                throw response
            }
            this.getFounders(companyId);
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_FOUNDER_ERROR')
        }
    }
}


const store = new CompanyDB();

export default store;