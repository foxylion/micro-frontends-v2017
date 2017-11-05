package de.jakobjarosch.examples.microfrontends.reports.controller

import de.jakobjarosch.examples.microfrontends.core.model.ModelWrapper
import de.jakobjarosch.examples.microfrontends.core.model.Project
import de.jakobjarosch.examples.microfrontends.reports.Configuration
import de.jakobjarosch.examples.microfrontends.reports.model.Slice
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.client.RestTemplate
import java.util.*

@RestController
@RequestMapping("/api/v1/report")
@CrossOrigin(maxAge = 3600)
class ReportEndpoint(val config: Configuration) {

    @GetMapping
    fun projects(): List<Slice> {
        val tmpl = RestTemplate()
        val model = tmpl.getForObject("${config.serviceCore}/api/v1/data", ModelWrapper::class.java)

        val result: List<List<Slice>> = model.allocations.map({ alloc ->
            val slices: MutableList<Slice> = mutableListOf()
            val project = model.getProject(alloc.projectId)
            val projectStart = project.start
            val projectEnd = project.start + project.duration

            (projectStart..projectEnd).mapTo(slices) {
                Slice(it, alloc.resourceId, alloc.amount / project.duration)
            }

            slices
        })

        return result.flatMap { it }
                .groupBy { slice -> Pair(slice.date, slice.resourceId) }
                .map { (key, values) -> Slice(key.first, key.second, values.sumByDouble(Slice::allocation)) }
    }

    fun ModelWrapper.getProject(projectId: UUID): Project {
        return projects.first { (id) -> id == projectId }
    }
}