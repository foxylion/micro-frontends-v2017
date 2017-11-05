package de.jakobjarosch.examples.microfrontends.reports.model

import java.util.*

data class Slice(val date: Long,
                 val resourceId: UUID,
                 val allocation: Double)