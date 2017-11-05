package de.jakobjarosch.examples.microfrontends.projectlist.controller

import de.jakobjarosch.examples.microfrontends.core.model.Allocation
import de.jakobjarosch.examples.microfrontends.core.model.ModelWrapper
import de.jakobjarosch.examples.microfrontends.core.model.Resource
import de.jakobjarosch.examples.microfrontends.projectlist.Configuration
import de.jakobjarosch.examples.microfrontends.projectlist.model.ListProject
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.client.RestTemplate
import java.util.*

@RestController
@RequestMapping("/api/v1/projects")
@CrossOrigin(maxAge = 3600)
class ProjectsEndpoint(val config: Configuration) {

    @GetMapping
    fun projects(): Set<ListProject> {
        val tmpl = RestTemplate()
        val model = tmpl.getForObject("${config.serviceCore}/api/v1/data", ModelWrapper::class.java)

        return model.projects.map({ (id, title, managerResourceId) ->
            val resource = model.getResource(managerResourceId)
            val allocationSum = model.getAllocationsForProject(id).sumByDouble(Allocation::amount)
            ListProject(id, title, "${resource.firstname} ${resource.lastname}", allocationSum)
        }).toSet()
    }

    fun ModelWrapper.getResource(resourceId: UUID): Resource {
        return resources.first { (id) -> id == resourceId }
    }

    fun ModelWrapper.getAllocationsForProject(projectId: UUID): Set<Allocation> {
        return allocations.filter { a -> a.projectId == projectId }.toSet()
    }
}