package de.jakobjarosch.examples.microfrontends.projectlist

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration

@Configuration
class Configuration {

    @Value("\${service.core}")
    val serviceCore: String = ""
}