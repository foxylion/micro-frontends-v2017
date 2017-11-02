package de.jakobjarosch.examples.microfrontends.core.model

import java.util.*

data class Allocation(val id: UUID = UUID.randomUUID(), val projectId: UUID = UUID.randomUUID(), val resourceId: UUID = UUID.randomUUID(), val amount: Double = 0.0)