package de.jakobjarosch.examples.microfrontends.core.model

data class ModelWrapper(val projects: Set<Project> = setOf(), val resources: Set<Resource> = setOf(), val allocations: Set<Allocation> = setOf())