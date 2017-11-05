package de.jakobjarosch.examples.microfrontends.core.model

import java.util.*

data class Allocation(val id: UUID, val projectId: UUID, val resourceId: UUID, val amount: Double)