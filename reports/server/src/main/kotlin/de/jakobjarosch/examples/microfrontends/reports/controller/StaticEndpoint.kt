package de.jakobjarosch.examples.microfrontends.reports.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.nio.file.Files
import java.nio.file.Paths
import javax.servlet.http.HttpServletResponse
import kotlin.streams.toList

@RestController
class StaticEndpoint {

    @GetMapping
    @RequestMapping("/static/js/main.js")
    fun js(response: HttpServletResponse): String {
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

    @GetMapping
    @RequestMapping("/static/css/main.css")
    fun css(response: HttpServletResponse): String {
        return try {
            val files = Files.list(Paths.get("static/static/css/")).toList()
            val jsFile = files.first { it.toString().endsWith(".css") }
            response.sendRedirect(jsFile.fileName.toString())
            ""
        } catch (e: java.nio.file.NoSuchFileException) {
            response.status = 404
            "Failed to resolve the css file"
        }
    }
}