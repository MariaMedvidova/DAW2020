<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html"/>
  <xsl:template match="/">
    <link rel="stylesheet" type="text/css" href="style.css"/>
    <html>
        <body style="background-color:lightgray;">

          <h2 style="text-align:center;">Portuguese NW archeosite dataset</h2>

          <table border="1" style="background-color:white;">
            <tr bgcolor="#9acd32">
              <th>#</th>
              <th>IDENTI</th>
              <th>DESCRI</th>
              <th>LUGAR</th>
              <th>FREGUE</th>
              <th>CONCEL</th>
              <th>AUTOR</th>
              <th>DATA</th>
            </tr>
            <xsl:for-each select="ARQSITS/ARQELEM">
              <xsl:variable name="i" select="position()" />
              <tr>
                <td>
                  <xsl:copy>
                    <xsl:value-of select="$i"/>
                  </xsl:copy>
                </td>
                <td><b><xsl:value-of select="IDENTI"/></b></td>
                <td><xsl:value-of select="DESCRI"/></td>
                <td><xsl:value-of select="LUGAR"/></td>
                <td><xsl:value-of select="FREGUE"/></td>
                <td><xsl:value-of select="CONCEL"/></td>
                <td><xsl:value-of select="AUTOR"/></td>
                <td><xsl:value-of select="DATA"/></td>
              </tr>
            </xsl:for-each>
          </table>

          <button type="button" class="collapsible">Open Collapsible</button>
          <div class="content">
            <p>Lorem ipsum...</p>
          </div>


        </body>
      </html>
    </xsl:template>
</xsl:stylesheet>