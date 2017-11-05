package de.jakobjarosch.examples.microfrontends.core.controller

import de.jakobjarosch.examples.microfrontends.core.model.Allocation
import de.jakobjarosch.examples.microfrontends.core.model.ModelWrapper
import de.jakobjarosch.examples.microfrontends.core.model.Project
import de.jakobjarosch.examples.microfrontends.core.model.Resource
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/api/v1/data")
class DataEndpoint {

    @GetMapping
    fun data(): ModelWrapper {
        val r1 = Resource(UUID.fromString("01ab91f0-b72e-4bde-b6ca-53b28c09b748"), "Egon", "Müller", setOf("Java", "Javascript", "React"))
        val r2 = Resource(UUID.fromString("c6643017-a9c2-4b47-a5dc-9d80e83e5a5f"), "Friedrich", "Mayer", setOf("Go", "C++", "Docker"))
        val r3 = Resource(UUID.fromString("7092bab2-1605-4009-8fe3-4c4f16d487f1"), "Hans", "", setOf("Docker", "Kubernetes", "AWS"))

        val p1 = Project(UUID.fromString("45293c9b-2252-4f9b-9353-c0536dd70de4"), "Introduce React", r1.id, 1000, 10)
        val p2 = Project(UUID.fromString("e299e206-0f79-4b91-b0f1-9053b29f16fb"), "Service Backend", r2.id, 1020, 4)
        val p3 = Project(UUID.fromString("6545fe6f-00e5-476b-8630-cde99f7e9baf"), "Infrastructure Review", r3.id, 1050, 2)

        val a1 = Allocation(UUID.fromString("cb87e8b8-559e-4159-b578-07a9d47c1f20"), p1.id, r1.id, 20.0)
        val a2 = Allocation(UUID.fromString("cf0a4213-bc00-498b-9127-d46f8df01fdb"), p1.id, r2.id, 15.0)
        val a3 = Allocation(UUID.fromString("4023477e-6169-46c6-8a48-2981ccecb474"), p2.id, r2.id, 27.0)
        val a4 = Allocation(UUID.fromString("4f5f7265-c76d-4eba-b205-66b20469b439"), p2.id, r3.id, 12.0)
        val a5 = Allocation(UUID.fromString("db3a6bc4-9a95-4112-9f60-90bcbbaad7be"), p3.id, r3.id, 50.0)

        return ModelWrapper(setOf(p1, p2, p3), setOf(r1, r2, r3), setOf(a1, a2, a3, a4, a5))
    }
}