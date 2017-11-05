package de.jakobjarosch.examples.microfrontends.core.model

import java.util.*

data class Project(val id: UUID, val title: String, val managerResourceId: UUID, val start: Long, val duration: Long)