import { defineStore } from 'pinia'
import axios from 'axios'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchProjects() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('/projects')
        this.projects = response.data
        return response.data
      } catch (error) {
        this.error = error.message
        console.error('Failed to fetch projects:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async createProject(projectData) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post('/projects', projectData)
        this.projects.push(response.data)
        return response.data
      } catch (error) {
        this.error = error.message
        console.error('Failed to create project:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateProject(id, projectData) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.put(`/projects/${id}`, projectData)
        const index = this.projects.findIndex((p) => p.id === id)
        if (index !== -1) {
          this.projects[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = error.message
        console.error('Failed to update project:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteProject(id) {
      this.loading = true
      this.error = null
      try {
        await axios.delete(`/projects/${id}`)
        this.projects = this.projects.filter((p) => p.id !== id)
        return true
      } catch (error) {
        this.error = error.message
        console.error('Failed to delete project:', error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
