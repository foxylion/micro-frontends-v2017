package de.jakobjarosch.examples.microfrontends.projectlist.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.nio.file.Files
import java.nio.file.Paths
import javax.servlet.http.HttpServletResponse
import kotlin.streams.toList

@RestController
@RequestMapping("/static/js/main.js")
class StaticEndpoint {

    @GetMapping
    fun projects(response: HttpServletResponse): String {
        return try {
            val files = Files.list(Paths.get("static/static/js/")).toList()
            val jsFile = files.first { it.toString().endsWith(".js") }
            response.sendRedirect(jsFile.fileName.toString())
            ""
        } catch (e: java.nio.file.NoSuchFileException) {
            response.status = 404
            "Failed to resolve the js file"
        }
    }
}