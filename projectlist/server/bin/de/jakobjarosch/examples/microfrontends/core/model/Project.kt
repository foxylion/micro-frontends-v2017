package de.jakobjarosch.examples.microfrontends.core.model

import java.util.*

data class Project(val id: UUID = UUID.randomUUID(),
                   val title: String = "",
                   val managerResourceId: UUID = UUID.randomUUID(),
                   val start: Long = 0,
                   val duration: Long = 0)