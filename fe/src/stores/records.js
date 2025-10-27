import { defineStore } from 'pinia'
import axios from 'axios'

export const useRecordsStore = defineStore('records', {
  state: () => ({
    records: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchRecordsByProject(projectId, options = {}) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`/projects/${projectId}/records`, { params: options })
        this.records = response.data.records
        return response.data
      } catch (error) {
        this.error = error.message
        console.error('Failed to fetch records:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async createRecord(projectId, recordData) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post(`/projects/${projectId}/records`, recordData)
        this.records.push(response.data)
        return response.data
      } catch (error) {
        this.error = error.message
        console.error('Failed to create record:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateRecord(id, recordData) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.put(`/records/${id}`, recordData)
        const index = this.records.findIndex((r) => r.id === id)
        if (index !== -1) {
          this.records[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = error.message
        console.error('Failed to update record:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteRecord(id) {
      this.loading = true
      this.error = null
      try {
        await axios.delete(`/records/${id}`)
        this.records = this.records.filter((r) => r.id !== id)
        return true
      } catch (error) {
        this.error = error.message
        console.error('Failed to delete record:', error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
