package de.jakobjarosch.examples.microfrontends.projectlist.model

import java.util.*

data class ListProject(val id: UUID,
                       val title: String,
                       val managerTitle: String,
                       val allocation: Double)